// app/api/collaboration/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CollaborationPayload = {
  name: string;
  email: string;
  company: string;
  role?: string;
  website?: string;
  phone?: string;
  focusAreas: string[];
  budget?: string;
  timeline?: string;
  channel?: string;
  message: string;
  nda?: boolean;
  updates?: boolean;
};

const focusAreaLabels: Record<string, string> = {
  "web-mobile": "Web & Mobile Product",
  "ai-data": "AI & Data",
  cloud: "Cloud & Infra",
  ux: "UX & Design Systems",
  other: "Other",
};

const safe = (val?: string) => (val && val.trim().length ? val : "-");

export async function POST(req: NextRequest) {
  try {
    // 🔹 BACA ENV DI DALAM HANDLER
    const CONTACT_EMAIL =
      process.env.CONTACT_EMAIL ||
      process.env.ZENTRA_GMAIL_USER ||
      "zentraconsultant@gmail.com";

    const CONTACT_EMAIL_APP_PASSWORD =
      process.env.CONTACT_EMAIL_APP_PASSWORD ||
      process.env.ZENTRA_GMAIL_APP_PASSWORD;

    // 🔹 DEBUG – LIHAT DI TERMINAL (bukan di browser)
    console.log("CONTACT_EMAIL:", CONTACT_EMAIL);
    console.log(
      "CONTACT_EMAIL_APP_PASSWORD set?",
      !!CONTACT_EMAIL_APP_PASSWORD,
    );

    if (!CONTACT_EMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "Email credentials are not configured on the server." },
        { status: 500 },
      );
    }

    const data = (await req.json()) as CollaborationPayload;

    const {
      name,
      email,
      company,
      role,
      website,
      phone,
      focusAreas,
      budget,
      timeline,
      channel,
      message,
      nda,
      updates,
    } = data;

    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const focusReadable =
      focusAreas && focusAreas.length > 0
        ? focusAreas.map((id) => focusAreaLabels[id] ?? id).join(", ")
        : "-";

    const text = `
New collaboration request from website

[ CONTACT ]
- Name           : ${name}
- Work email     : ${email}
- Company        : ${company}
- Role           : ${safe(role)}

[ CONTEXT ]
- Website        : ${safe(website)}
- WhatsApp       : ${safe(phone)}
- Preferred channel : ${safe(channel)}

[ FOCUS & SCOPE ]
- Focus areas    : ${focusReadable}
- Budget (IDR)   : ${safe(budget)}
- Timeline       : ${safe(timeline)}

[ MESSAGE ]
${message}

[ PREFERENCES ]
- NDA requested  : ${nda ? "Yes" : "No"}
- Receive updates: ${updates ? "Yes" : "No"}
`;

    const html = `
<div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;color:#111827;line-height:1.6;">
  <h1 style="font-size:20px;margin:0 0 4px;">New collaboration request</h1>
  <p style="margin:0 0 16px;">You received a new collaboration request from your website collaboration page.</p>

  <h2 style="font-size:16px;margin:16px 0 4px;">Contact</h2>
  <table style="border-collapse:collapse;width:100%;max-width:640px;">
    <tbody>
      <tr>
        <td style="padding:4px 8px;width:160px;font-weight:600;">Name</td>
        <td style="padding:4px 8px;">${name}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">Work email</td>
        <td style="padding:4px 8px;">${email}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">Company</td>
        <td style="padding:4px 8px;">${company}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">Role</td>
        <td style="padding:4px 8px;">${safe(role)}</td>
      </tr>
    </tbody>
  </table>

  <h2 style="font-size:16px;margin:20px 0 4px;">Context</h2>
  <table style="border-collapse:collapse;width:100%;max-width:640px;">
    <tbody>
      <tr>
        <td style="padding:4px 8px;width:160px;font-weight:600;">Website</td>
        <td style="padding:4px 8px;">${safe(website)}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">WhatsApp</td>
        <td style="padding:4px 8px;">${safe(phone)}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">Preferred channel</td>
        <td style="padding:4px 8px;">${safe(channel)}</td>
      </tr>
    </tbody>
  </table>

  <h2 style="font-size:16px;margin:20px 0 4px;">Focus & scope</h2>
  <table style="border-collapse:collapse;width:100%;max-width:640px;">
    <tbody>
      <tr>
        <td style="padding:4px 8px;width:160px;font-weight:600;">Focus areas</td>
        <td style="padding:4px 8px;">${focusReadable}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">Estimated budget (IDR)</td>
        <td style="padding:4px 8px;">${safe(budget)}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">Timeline</td>
        <td style="padding:4px 8px;">${safe(timeline)}</td>
      </tr>
    </tbody>
  </table>

  <h2 style="font-size:16px;margin:20px 0 4px;">Message</h2>
  <div style="padding:8px 10px;border-radius:8px;background:#F9FAFB;border:1px solid #E5E7EB;white-space:pre-wrap;">
    ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
  </div>

  <h2 style="font-size:16px;margin:20px 0 4px;">Preferences</h2>
  <table style="border-collapse:collapse;width:100%;max-width:640px;">
    <tbody>
      <tr>
        <td style="padding:4px 8px;width:160px;font-weight:600;">NDA requested</td>
        <td style="padding:4px 8px;">${nda ? "Yes" : "No"}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:600;">Receive updates</td>
        <td style="padding:4px 8px;">${updates ? "Yes" : "No"}</td>
      </tr>
    </tbody>
  </table>

  <p style="margin:24px 0 0;font-size:12px;color:#6B7280;">
    This email was generated automatically from the collaboration form on your website.
  </p>
</div>
`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: CONTACT_EMAIL,
        pass: CONTACT_EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Zentra Website" <${CONTACT_EMAIL}>`,
      to: "zentraconsultant@gmail.com",
      replyTo: email,
      subject: `New collaboration request – ${name} (${company})`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Collaboration email error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
