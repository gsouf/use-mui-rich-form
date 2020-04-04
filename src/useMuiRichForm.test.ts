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
  });
  // it('setProcessing', () => {
  //
  //   const { setProcessing, readOnly, processing } = renderHook(() => useMuiRichForm());
  //
  //   expect(processing).toBeFalsy();
  //   expect(readOnly).toBeFalsy();
  //
  //   // Fast-forward 1sec
  //   act(() => {
  //     jest.advanceTimersByTime(1000);
  //   });
  //
  //   // Check after total 1 sec
  //   expect(result.current).toBe(1);
  //
  //   // Fast-forward 1 more sec
  //   act(() => {
  //     jest.advanceTimersByTime(1000);
  //   });
  //
  //   // Check after total 2 sec
  //   expect(result.current).toBe(2);
  // })
});
