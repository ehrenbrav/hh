#include <node.h>
#include "omniwear.h"

namespace omni_wrapper {

        using v8::Exception;
        using v8::FunctionCallbackInfo;
        using v8::Isolate;
        using v8::Local;
        using v8::Object;
        using v8::String;
        using v8::Value;
        using v8::Persistent;

        //Omniwear::DeviceP handle = 0x0;
        Persistent<Omniwear::DeviceP> persist;

        // Open the haptic device.
        void open(const FunctionCallbackInfo<Value>& args) {

                Isolate* isolate = args.GetIsolate();

                // Check args.
                if (args.Length() != 0) {
                        isolate->ThrowException(Exception::TypeError(
                            String::NewFromUtf8(isolate, "open takes no arguments.\n")));
                        return;
                }

                // Open the device.
                printf("Opening haptic device.\n");
                Omniwear::DeviceP handle = Omniwear::open();
                persist = Persistent<Omniwear::DeviceP>::New(handle);

                // If successful, return true;
                if (handle) {
                        args.GetReturnValue().Set(true);

                        // DEBUG
                        printf("Got handle: %#08x\n", handle.get());
                } else {
                        printf("Could not open haptic device.\n");
                        args.GetReturnValue().Set(false);
                }
        }

        // Reset all motors.
        void reset_motors(const FunctionCallbackInfo<Value>& args) {
                
                Isolate* isolate = args.GetIsolate();

                // Check args.
                if (args.Length() != 0) {
                        isolate->ThrowException(Exception::TypeError(
                            String::NewFromUtf8(isolate, "reset_motors takes no arguments.\n")));
                        return;
                }

                // Reset the device.
                printf("Resetting haptic device.\n");
                bool ret = Omniwear::reset_motors((Omniwear::Device*)&handle);

                // Error handle.
                if (ret) {
                        printf("Error resetting haptic device.\n");
                        return;
                }
        }

        void configure_motor(const FunctionCallbackInfo<Value>& args) {

                Isolate* isolate = args.GetIsolate();

                // Check args.
                if (args.Length() != 2) {
                        isolate->ThrowException(Exception::TypeError(
                            String::NewFromUtf8(isolate, "configure_motor takes 2 arguments.\n")));
                        return;
                }

                // Run the motor.

                // DEBUG
                printf("Sending pointer: %#08x\n", handle.get());
                Omniwear::configure_motor((Omniwear::Device*)&handle, args[0]->NumberValue(), args[1]->NumberValue());
        }

        void init(Local<Object> exports) {

                NODE_SET_METHOD(exports, "open", open);
                NODE_SET_METHOD(exports, "reset_motors", reset_motors);
                NODE_SET_METHOD(exports, "configure_motor", configure_motor);
        }
        
} // namespace



