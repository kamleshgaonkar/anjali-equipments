import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      contactPerson,
      email,
      phone,
      requirements,
      products,
    } = body;

    // Basic validation
    if (!contactPerson || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No products were selected.",
        },
        { status: 400 }
      );
    }

    const productRows = products
      .map(
        (product: {
          name: string;
          model?: string;
          quantity: number;
        }) => `
          <tr>
            <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;">
              <strong>${product.name}</strong>

              ${
                product.model
                  ? `<br>
                     <span style="font-size:13px;color:#64748b;">
                       Model: ${product.model}
                     </span>`
                  : ""
              }
            </td>

            <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">
              ${product.quantity}
            </td>
          </tr>
        `
      )
      .join("");

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
                New Quote Request
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
                Customer Information
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
                    Contact Person
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      font-weight:600;
                    "
                  >
                    ${contactPerson}
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


              <!-- Selected Equipment -->

              <h2
                style="
                  font-size:18px;
                  margin:40px 0 20px;
                "
              >
                Selected Equipment
              </h2>


              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                  font-size:14px;
                "
              >

                <thead>

                  <tr style="background:#f8fafc;">

                    <th
                      style="
                        padding:12px;
                        text-align:left;
                      "
                    >
                      Equipment
                    </th>

                    <th
                      style="
                        padding:12px;
                        text-align:center;
                        width:100px;
                      "
                    >
                      Quantity
                    </th>

                  </tr>

                </thead>


                <tbody>

                  ${productRows}

                </tbody>

              </table>


              <!-- Requirements -->

              <h2
                style="
                  font-size:18px;
                  margin:40px 0 20px;
                "
              >
                Additional Requirements
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

                ${
                  requirements
                    ? requirements.replace(/\n/g, "<br>")
                    : "No additional requirements provided."
                }

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
        `New Quote Request - ${contactPerson}`,

      html,

    });


    if (error) {

      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send quotation request.",
        },
        { status: 500 }
      );

    }


    return NextResponse.json({

      success: true,

      message:
        "Quotation request sent successfully.",

      id: data?.id,

    });

  } catch (error) {

    console.error("Quote API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your request.",
      },
      { status: 500 }
    );

  }
}