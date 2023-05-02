import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';

const appHomeOpenedCallback = async ({ client, event }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'app_home_opened'>) => {
  console.log('app home opened');
  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== 'home') return;
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const todayFormatted = `${year}-${month}-${day}`;

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: "Hello! SparkBagel is a bot that will arrange members of the channel it's added to into random groups of 3 every 2 weeks.\n\n *Please select the first date to send out new groups:*",
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Pick a date for SparkBagelBot to send out new group assignments.',
            },
            accessory: {
              type: 'datepicker',
              initial_date: todayFormatted,
              placeholder: {
                type: 'plain_text',
                text: 'Select a date',
                emoji: true,
              },
              action_id: 'datepicker-action',
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default appHomeOpenedCallback;
