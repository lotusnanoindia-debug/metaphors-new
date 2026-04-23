import type { APIRoute } from "astro";
import { Resend } from "resend";
// @ts-ignore - Valid in Cloudflare context
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.formData();

    // Access Cloudflare bindings natively for v13
    const cloudflareEnv = typeof env !== "undefined" ? env : {};
    const db = (cloudflareEnv as any).DB;
    const resendKey = (cloudflareEnv as any).RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

    // Create Resend instance using Cloudflare environment variable
    const resend = new Resend(resendKey);

    // SPAM / BOT PROTECTION (Honeypot)
    const gotcha = data.get("_gotcha");
    if (gotcha) {
      return new Response(JSON.stringify({ success: true, message: "Message sent" }), {
        status: 200,
      });
    }

    const name = data.get("full-name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const organisation = data.get("organisation") as string;
    const sector = (data.get("sector") as string)?.trim() || "Not specified";
    const discipline = (data.get("discipline") as string)?.trim() || "Not specified";
    const message = data.get("message") as string;
    const context = (data.get("contactContext") as string) || "General Enquiry";
    const originatingPage = (data.get("originatingPage") as string) || "Not specified";

    // 1. SAVE TO D1 (Persistence)
    if (db) {
      try {
        await db
          .prepare(
            `INSERT INTO enquiries (name, email, phone, organisation, sector, discipline, message, context, originating_page) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          )
          .bind(
            name,
            email,
            phone,
            organisation,
            sector,
            discipline,
            message,
            context,
            originatingPage,
          )
          .run();
      } catch (dbErr) {
        console.error("D1 Persistence Error:", dbErr);
        // We continue anyway so the email still tries to send
      }
    }

    const subject = `Enquiry Received: Metaphors Design`;

    // Editorial-grade email template
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; max-width: 600px; margin: 0 auto; line-height: 1.6; padding: 20px;">
        <p style="font-size: 15px; font-weight: 400;">Dear ${name},</p>
        <p style="font-size: 15px; font-weight: 400;">Thank you for reaching out to Metaphors Design. A senior architect will review your enquiry and respond within two working days.</p>
        
        <div style="margin: 40px 0; padding: 30px; background-color: #f2f1ec; border-left: 2px solid #111111;">
          <p style="margin: 0 0 16px 0; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(17, 17, 17, 0.4);">Your Details</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 4px 0; color: #666; width: 120px;">Name</td><td style="padding: 4px 0;">${name}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Email</td><td style="padding: 4px 0;">${email}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Organisation</td><td style="padding: 4px 0;">${organisation || "N/A"}</td></tr>
            ${phone ? `<tr><td style="padding: 4px 0; color: #666;">Phone</td><td style="padding: 4px 0;">${phone}</td></tr>` : ""}
            <tr><td style="padding: 4px 0; color: #666;">Sector</td><td style="padding: 4px 0;">${sector}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Discipline</td><td style="padding: 4px 0;">${discipline}</td></tr>
          </table>
          
          <p style="margin: 24px 0 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(17, 17, 17, 0.4);">Your Message:</p>
          <p style="margin: 0; font-size: 14px; white-space: pre-wrap;">${message}</p>
        </div>

        <p style="font-size: 11px; color: rgba(17, 17, 17, 0.5); margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(17, 17, 17, 0.1);">
          <strong>Metaphors Design</strong><br>
          (+91) 96653 55522 | (+91) 98222 79173<br>
          <a href="https://metaphors-design.com" style="color: #111111; text-decoration: none;">metaphors-design.com</a>
        </p>
      </div>
    `;

    const { data: resendData, error } = await resend.emails.send({
      from: "Metaphors Design <info@metaphors-design.com>",
      to: [email],
      bcc: ["lotusnanoindia@gmail.com"],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
    });
  } catch (err: any) {
    console.error("Server Internal Error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
};
