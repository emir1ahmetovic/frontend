


import type * as React from "react";

declare module "react" {
	// Ensure JSX namespace is available globally
	namespace JSX {
		interface IntrinsicElements {
			[elemName: string]: any;
		}
	}
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			[elemName: string]: any;
		}
	}
}
