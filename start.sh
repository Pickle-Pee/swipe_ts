#!/bin/bash

watchman watch-del '/Users/berizaryad62/Desktop/Swipe_TS'
watchman watch-project '/Users/berizaryad62/Desktop/Swipe_TS'
npx react-native start --reset-cache
