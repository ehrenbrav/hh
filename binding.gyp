{
  "targets": [
    {      
      "target_name": "omniwear_addon",
      "sources": [
        "omniwear_wrapper.cc",
        "omniwear.h",
        "hid.h"
      ],
      "libraries": [
        "-lomniwear_sdk"
      ]
    }
  ]
}