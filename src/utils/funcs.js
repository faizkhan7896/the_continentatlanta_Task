export const sendNotification = async ({
  tokens,
  title,
  body,
  included_segments,
}) => {
  // alert('sending');
  await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    body: JSON.stringify({
      app_id: '6948b1a9-ba95-4262-9e02-ba9460100332',
      include_external_user_ids: tokens,
      included_segments: included_segments,
      contents: {en: body},
      headings: {en: title},
      app_url: 'speedmeeting://',
      large_icon: 'ic_stat_onesignal_default',
      small_icon: 'ic_stat_onesignal_default',
    }),

    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer OGRiY2QyNzQtNWVjOS00YTI1LTk4M2MtNDY2Mjg0N2YyMmUx',
    },
  })
    .then(v => v.json())
    .then(console.log);
};
