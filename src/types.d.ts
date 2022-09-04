declare const PresentationRequest: any;

interface Navigator {
  presentation: any;
}

interface Window {
  getScreenDetails(): any;
  isMultiScreen(): Promise<boolean>;
}

interface Screen {
  isExtended: boolean;
}

// interface FullscreenOptions {
//   screen?: Screen;
// }
