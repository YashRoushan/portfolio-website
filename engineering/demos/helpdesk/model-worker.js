const model = "onnx-community/SmolLM2-135M-Instruct-ONNX-MHA";
const system = {
  role: "system",
  content: "Give concise general IT troubleshooting advice in two sentences. Do not invent links or request private details. For campus-specific questions you cannot answer, direct the user to their IT help desk.",
};
let generator;

self.addEventListener("message", async ({ data }) => {
  try {
    if (data.kind === "load") {
      const { env, pipeline } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1");
      env.allowLocalModels = false;
      env.backends.onnx.wasm.numThreads = 1;
      generator = await pipeline("text-generation", model, {
        device: "wasm",
        dtype: "q8",
        progress_callback: (progress) => {
          if (progress.status === "progress" && progress.file?.endsWith(".onnx")) {
            self.postMessage({ kind: "progress", percent: Math.round(progress.progress) });
          }
        },
      });
      self.postMessage({ kind: "ready" });
      return;
    }
    if (data.kind !== "ask" || !generator) return;
    const [result] = await generator([system, ...data.messages], { max_new_tokens: 72, do_sample: false });
    const text = result.generated_text.at(-1)?.content?.trim();
    if (!text) throw new Error("Empty model response");
    self.postMessage({ kind: "answer", text });
  } catch {
    self.postMessage({ kind: "error" });
  }
});
