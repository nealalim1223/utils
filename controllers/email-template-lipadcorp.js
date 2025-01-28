const formatLongDatetime = require("./format-long-datetime");

module.exports = (type, currentUrl, data, emailData, currentApprover) => {
  const renderDetail = (label, value) => `<p><b>${label}:</b> ${value}<br/></p>`;
  const renderData = (emailData) => emailData.map(detail => renderDetail(detail.label, detail.value)).join('');

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
              ${emailMessage(type, data, currentApprover)}
              ${emailSeparator()}
              <div style="font-weight:bold;padding:8px 24px 8px 0px">
                Request Details
              </div>
              <div style="font-weight:normal;padding:0px 16px 8px 16px; line-height: 1;">
                ${emailStatus(data.status)}
                ${renderData(emailData)}
              </div>
              ${emailSeparator()}
            ${emailApproverSection(type, currentUrl, data, currentApprover)}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`;
}

const emailSeparator = () => {
  return (`
    <div style="padding:8px 0px 8px 0px">
      <hr style="width:100%;border:none;border-top:1px solid #CCCCCC;margin:0" />
    </div>
  `)
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

const emailStatus = (status) => {
  return (`
    <p>
      <b>Status:</b> 
      <span style="display:inline-block; background-color:${status === 'Approved' ? '#28a745' : status === 'Rejected' ? '#dc3545' : '#ffc107'}; color:white; font-weight:bold; border-radius:4px; padding:2px 6px; margin-left:5px;">
        ${status}
      </span>
    </p>
  `)
}

const emailMessage = (type, data, currentApprover) => {
  return (`
    <div style="font-weight:normal;padding:0px 0px 0px 0px">
      <p>
        Dear ${type === 'requestor' ? `<b style="color:#003087">${data.requestor}</b>` : `<b style="color:#003087">${currentApprover.approver}</b>`},
        <br>
        ${type === 'requestor' ?
      `Your ticket request with uid <b style="color:#fe5000">${data.uid}</b> has been ${data.status === 'Approved' ? `<b style="color:#28a745">approved</b>` : data.status === 'Rejected' ? `<b style="color:#dc3545">rejected</b>` : 'submitted'}. Please check the details below.`
      : `There is an ticket request with uid <b style="color:#fe5000">${data.uid}</b> that needs your approval. Please check the details below.`}
      </p>
    </div>
  `)
}

const emailApproverSection = (type, currentUrl, data, currentApprover) => {
  return (`
     <table width="100%" style="border-collapse: collapse;">
      <tr>
        <td style="font-weight:bold;padding:8px 24px 8px 0px; vertical-align: middle;">
          Approval Details
        </td>
        <td style="text-align: right; padding: 8px 0 0 0; vertical-align: middle;">
          <a
            href="${type === 'requestor' ? `${currentUrl}/${data.uid}` : `${currentUrl}/${data.uid}/${currentApprover.uid}`} "
            style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#003087;border-radius:4px;display:inline-block;padding:4px 8px;text-decoration:none; margin: 0;"
            target="_blank">
            <span>${type === 'requestor' ? 'Check Progress' : 'Approve/Reject'}</span>
          </a>
        </td>
      </tr>
    </table>
    <div style="font-weight:normal;padding:0px 16px 8px 16px; line-height: 1;">
      ${data.approval.map((approval, index) => {
    return `
          <p><b>Status:</b>
            <span style="display:inline-block; background-color:${approval.status === 'Approved' ? '#28a745' : approval.status === 'Rejected' ? '#dc3545' : '#ffc107'}; color:white; font-weight:bold; border-radius:4px; padding:2px 6px; margin-left:5px;">
              ${approval.status}
            </span>
          </p>
          <p><b>Approver:</b> ${approval.approver}</p>
          <p><b>Email:</b> ${approval.email}</p>
          <p><b>Role:</b> ${approval.role}</p>
          ${approval.attachment && (`<p><b>Attachment:</b> <br><a href="${approval.attachment}" target="_blank"><img src="${approval.attachment}" alt="Attachment" style="width:100px;height:100px;margin-top:10px" /></a></p>`)}
          ${approval.comment && (`<p><b>Comment:</b> ${approval.comment}</p>`)}
          ${approval.timestamp || approval.timestamp !== undefined && (`<p><b>Timestamp:</b> ${formatLongDatetime(approval.timestamp._seconds * 1000)}</p>`)}
          ${index < data.approval.length - 1 ? '<hr style="width:100%;border:none;border-top:1px solid #CCCCCC;margin:0" />' : ''}
        `;
  }).join('')}
    </div>
  `)
}
