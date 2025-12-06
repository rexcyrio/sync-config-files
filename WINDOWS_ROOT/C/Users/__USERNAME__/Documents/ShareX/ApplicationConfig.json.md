# Notes

```jsonc
{
  // after capturing a screenshot, do not upload it to the web
  "AfterCaptureJob": "CopyImageToClipboard, SaveImageToFile",

  // do not play sounds after capture / upload / ShareX actions (https://getsharex.org/action/)
  "PlaySoundAfterCapture": false,
  "PlaySoundAfterUpload": false,
  "PlaySoundAfterAction": false,

  // the toast notification should go away asap
  "ToastWindowDuration": 0.0,

  // hide cursor in screenshots
  "ShowCursor": false,

  // when using ctrl + print screen, you can edit the capture region
  // as many times as you like before pressing enter to capture it
  "QuickCrop": false,

  // when using ctrl + print screen, use the biggest magnifier
  "MagnifierPixelCount": 35,

  // when using ctrl + print screen, set the top bar menu size to 20
  // (16 is bit too small)
  "MenuIconSize": 20,

  // objects won't have drop shadows
  "Shadow": false,

  // show "Standard Colors" instead of "Recent Colors" when picking a color
  // for e.g., rectangle border
  "RecentColorsSelected": false,

  // "0" means dark theme
  // "1" means light theme
  "SelectedTheme": 1,

  // disable uploads globally
  "DisableUpload": true,
}

```
