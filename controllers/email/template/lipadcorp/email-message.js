module.exports = (data, message) => {
  return `<div style='${`
      background-color:#F5F5F5;
      color:#262626;
      font-family:Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif;
      font-size:16px;
      font-weight:400;
      letter-spacing:0.15008px;
      line-height:1.5;
      margin:0;
      padding:32px 0;
      min-height:100%;
      width:100%
    `}'>
    <table align="center" width="100%" style="${`
        margin:0 auto;
        max-width:800px;
        background-color:#FFFFFF;
        border-radius:8px
      `}" role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tbody>
        <tr style="width:100%">
          <td>
            ${emailHeader()}
            <div style="border-radius:0;padding:16px 24px 16px 24px">
              ${emailMessage(data, message)}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`;
}

const emailHeader = () => {
  return (`
    <div style="padding:16px 24px 16px 24px; background-color:#003087; border-radius:8px 8px 0 0;">
      <img alt="LIPAD Corporation"
        src="https://drive.google.com/uc?export=download&amp;id=1fkmkfqO2P4YrYdlOlr-QM_aPAYiehmdk" height="40"
        style="height:40px;outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%" />
    </div>
  `)
}

const emailMessage = (data, message) => {
  return (`
    <div style="font-weight:normal;padding:0px 0px 0px 0px">
      <p>
        Dear ${data.email},
        <br>
        <br>
         ${message}
        <br>
      </p>
    </div>
  `)
}
