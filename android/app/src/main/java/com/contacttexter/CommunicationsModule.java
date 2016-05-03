package com.contacttexter;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by ajwhite on 5/3/16.
 */
public class CommunicationsModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "CommunicationsModule";

    private Activity activity;

    public CommunicationsModule(ReactApplicationContext reactApplicationContext, Activity activity) {
        super(reactApplicationContext);
        this.activity = activity;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void createPhoneCall(String number) {
        Intent callIntent = new Intent(Intent.ACTION_CALL);
        callIntent.setData(Uri.parse("tel:" + number));
        activity.startActivity(callIntent);
    }

    @ReactMethod
    public void createSMSMessage(String number, String message) {
        Intent smsIntent = new Intent(Intent.ACTION_VIEW);
        smsIntent.setType("vnd.android-dir/mms-sms");
        smsIntent.putExtra("address", number);
        smsIntent.putExtra("sms_body", message);
        activity.startActivity(smsIntent);
    }
}
