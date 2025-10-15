declare global {
  interface Window {
    webflow: WebflowAPI;
  }
  
  const webflow: WebflowAPI;
}

interface WebflowAPI {
  getSelectedElement(): Promise<WebflowElement | null>;
  notify(options: { type: 'Success' | 'Error' | 'Info'; message: string }): Promise<void>;
}

interface WebflowElement {
  textContent: boolean;
  setTextContent(text: string): void;
}

export {};
