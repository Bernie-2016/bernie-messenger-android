import {NativeModules} from 'react-native';
const {AnswersModule} = NativeModules;

export function logEvent (name, customAttributes = null) {
  AnswersModule.logEvent(name, customAttributes);
}
