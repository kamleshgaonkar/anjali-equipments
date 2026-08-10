import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      message,
    } = body;

  // Basic validation
if (!name || !email || !phone) {
    return NextResponse.json(
      {
        success: false,
        message: "Please fill in all required fields.",
      },
      { status: 400 }
    );
  }

    const html = `
      <!DOCTYPE html>

      <html>

        <body
          style="
            margin:0;
            background:#f8fafc;
            font-family:Arial,Helvetica,sans-serif;
            color:#0f172a;
          "
        >

          <div
            style="
              max-width:700px;
              margin:40px auto;
              background:#ffffff;
              border:1px solid #e2e8f0;
              border-radius:16px;
              overflow:hidden;
            "
          >

            <!-- Header -->

            <div
              style="
                background:#b91c1c;
                padding:28px 32px;
                color:#ffffff;
              "
            >

              <h1 style="margin:0;font-size:24px;">
                New Website Enquiry
              </h1>

              <p
                style="
                  margin:8px 0 0;
                  font-size:14px;
                  opacity:.9;
                "
              >
                Anjali Equipments Website
              </p>

            </div>


            <!-- Customer Information -->

            <div style="padding:32px;">

              <h2
                style="
                  font-size:18px;
                  margin:0 0 20px;
                "
              >
                Contact Information
              </h2>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                  font-size:14px;
                "
              >

                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#64748b;
                      width:180px;
                    "
                  >
                    Name
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      font-weight:600;
                    "
                  >
                    ${name}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#64748b;
                    "
                  >
                    Email
                  </td>

                  <td style="padding:8px 0;">
                    ${email}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#64748b;
                    "
                  >
                    Mobile
                  </td>

                  <td style="padding:8px 0;">
                    ${phone}
                  </td>
                </tr>

              </table>


              <!-- Message -->

              <h2
                style="
                  font-size:18px;
                  margin:40px 0 20px;
                "
              >
                Message
              </h2>

              <div
                style="
                  background:#f8fafc;
                  border-radius:12px;
                  padding:18px;
                  font-size:14px;
                  line-height:1.7;
                  color:#475569;
                "
              >
                ${message.replace(/\n/g, "<br>")}
              </div>

            </div>


            <!-- Footer -->

            <div
              style="
                border-top:1px solid #e2e8f0;
                padding:20px 32px;
                background:#f8fafc;
                font-size:12px;
                color:#64748b;
              "
            >
              This enquiry was submitted through the
              Anjali Equipments website.
            </div>

          </div>

        </body>

      </html>
    `;

    const { data, error } = await resend.emails.send({
      from:
        "Anjali Equipments Website <website@anjaliequipments.com>",

      to: ["info@anjaliequipments.com"],

      replyTo: email,

      subject:
        `New Website Enquiry - ${name}`,

      html,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send your enquiry.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry sent successfully.",
      id: data?.id,
    });

  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your enquiry.",
      },
      { status: 500 }
    );
  }
}