import { App } from '@slack/bolt';
import sampleActionCallback from './sample-action';
import datepickerActionCallback from './datepicker-action';

const register = (app: App) => {
  app.action('sample_action_id', sampleActionCallback);
  app.action('datepicker-action', datepickerActionCallback);
};

export default { register };
