import { useMuiRichForm } from "./";
import { renderHook, act } from "@testing-library/react-hooks";

// mock timer using jest
jest.useFakeTimers();

describe("useMuiRichForm", () => {
  it("default values", () => {
    const { result } = renderHook(() => useMuiRichForm());

    expect(result.current.processing).toBe(false);
    expect(result.current.readOnly).toBe(false);
    expect(result.current.success).toBeNull();
    expect(result.current.failure).toBeNull();
  });

  it("getValues and setValue", () => {
    const { result } = renderHook(() => useMuiRichForm());

    result.current.register({name: 'foo'});

    act(() => {
      result.current.setValue('foo', 'bar');
    });

    expect(result.current.getValues()).toEqual({'foo': 'bar'});
  });

  it("set processing", () => {
    const { result } = renderHook(() => useMuiRichForm());

    act(() => {
      result.current.setProcessing();
    });

    expect(result.current.processing).toBe(true);
    expect(result.current.readOnly).toBe(true);
    expect(result.current.success).toBeNull();
    expect(result.current.failure).toBeNull();
  });

  it("set success", () => {
    const { result } = renderHook(() => useMuiRichForm());

    act(() => {
      result.current.setProcessing();
      result.current.setSuccess("foo");
    });

    expect(result.current.processing).toBe(false);
    expect(result.current.readOnly).toBe(true);
    expect(result.current.success).toBe("foo");
    expect(result.current.failure).toBeNull();
  });

  it("setSuccess and do NOT reset", () => {
    const { result } = renderHook(() => useMuiRichForm());

    result.current.register({name: 'foo'});

    act(() => {
      result.current.setValue('foo', 'bar');
      result.current.setSuccess('done');
    });

    expect(result.current.getValues()).toEqual({'foo': 'bar'});
  });

  it("setSuccess and DO reset", () => {
    const { result } = renderHook(() => useMuiRichForm());

    result.current.register({name: 'foo'});

    act(() => {
      result.current.setValue('foo', 'bar');
      result.current.setSuccess('done', {resetForm: true});
    });

    expect(result.current.getValues()).toEqual({});
  });

  it("set success not readOnly and use dismissAfter", () => {
    const { result } = renderHook(() => useMuiRichForm());

    act(() => {
      result.current.setProcessing();
      result.current.setSuccess("foo", { readOnly: false, dismissAfter: 1000 });
    });

    expect(result.current.processing).toBe(false);
    expect(result.current.readOnly).toBe(false);
    expect(result.current.success).toBe("foo");
    expect(result.current.failure).toBeNull();

    // is not dismissed before 1000
    act(() => {
      jest.advanceTimersByTime(999);
    });
    expect(result.current.success).toBe("foo");

    // is dismissed at 1000
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.success).toBe(null);
  });

  it("set failure", () => {
    const { result } = renderHook(() => useMuiRichForm());

    act(() => {
      result.current.setProcessing();
      result.current.setFailure("bar");
    });

    expect(result.current.processing).toBe(false);
    expect(result.current.readOnly).toBe(false);
    expect(result.current.success).toBeNull();
    expect(result.current.failure).toBe("bar");
    expect(result.current.submitButton().error).toBe(true);

    // is not dismissed before 1000
    act(() => {
      jest.advanceTimersByTime(999);
    });
    expect(result.current.submitButton().error).toBe(true);

    // is dismissed at 1000
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.failure).toBe("bar");
    expect(result.current.submitButton().error).toBe(false);
  });
});
