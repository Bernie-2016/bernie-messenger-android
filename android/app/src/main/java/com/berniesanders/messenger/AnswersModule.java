package com.berniesanders.messenger;

import com.crashlytics.android.answers.Answers;
import com.crashlytics.android.answers.CustomEvent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

import javax.annotation.Nullable;

/**
 * Created by Atticus White on 5/19/16.
 */
public class AnswersModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "AnswersModule";

    public AnswersModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void logEvent (String eventName, @Nullable ReadableMap customAttributes) {
        CustomEvent event = new CustomEvent(eventName);

        if (customAttributes != null) {
            ReadableMapKeySetIterator iterator = customAttributes.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                switch (customAttributes.getType(key)) {
                    case String:
                        event.putCustomAttribute(key, customAttributes.getString(key));
                        break;
                    case Number:
                        event.putCustomAttribute(key, customAttributes.getDouble(key));
                        break;

                }
            }
        }

        Answers.getInstance().logCustom(event);
    }
}
