import { AllMiddlewareArgs, BlockDatepickerAction, SlackActionMiddlewareArgs } from '@slack/bolt';

const datepickerActionCallback = async ({ ack, client, body }:
  AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockDatepickerAction>) => {
  try {
    await ack();
    // console.log('CLIENT', client);
    // console.log('BODY VIEW', body.view);
    const datepickerAction = body.actions.find((action) => action.action_id === 'datepicker-action');
    const pickedDate = datepickerAction?.selected_date;
    // TODO: format this date so it looks prettier, add an option to the views to CHANGE the date
    client.views.update({
      user_id: body.user?.id,
      view_id: body.view?.id,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `Great! Your first SparkBagel Groups will be made on ${pickedDate}, except not really, because this app is still under construction.`,
              emoji: true,
            },
          },
        ],
      },
    });
    // TODO: use the pickedDate to actually make groups and send messages
  } catch (error) {
    console.error(error);
  }
};

export default datepickerActionCallback;
