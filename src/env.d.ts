declare module "cloudflare:workers" {
  export const env: {
    DB?: any;
    RESEND_API_KEY?: string;
  };
}
