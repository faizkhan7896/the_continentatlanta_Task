# Changes to make it work

## Change 1

### File - node_modules/react-native-maps/ios/AirGoogleMaps/AIRGoogleMap.m

Replace

```
#import <Google-Maps-iOS-Utils/GMUKMLParser.h>
#import <Google-Maps-iOS-Utils/GMUPlacemark.h>
#import <Google-Maps-iOS-Utils/GMUPoint.h>
#import <Google-Maps-iOS-Utils/GMUGeometryRenderer.h>
```

with

```
#import "GMUKMLParser.h"
#import "GMUPlacemark.h"
#import "GMUPoint.h"
#import "GMUGeometryRenderer.h"
```

## Change 2

### File - node_modules/react-native-maps/ios/AirGoogleMaps/AIRGoogleMapHeatmap.h

Replace

```
#import <Google-Maps-iOS-Utils/GMUHeatmapTileLayer.h>
```

with

```
#import "GMUHeatmapTileLayer.h"
```
