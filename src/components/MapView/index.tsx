import {
  Map,
  APILoader,
  CustomOverlay,
  Marker as Markers,
} from "@uiw/react-baidu-map";
import styles from "./index.module.less";
import cs from "classnames";
import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import mapStyles from "./mapStyles.json";
import Marker from "./Marker";
import { areaMask } from "./constat";
import { isEmpty } from "lodash-es";
import { addAreaMask } from "./utils";
import { parkCode } from "@/layouts/constat";
type MapViewProps = {
  className?: string;
  mapExtraRender?: (map: any) => React.ReactNode | React.ReactNode[];
  markerList?: {
    lng: number;
    lat: number;
    color?: string;
    onClick?: (e: any, item: any) => any;
  }[];
  mapRef?: any;
  mapClickWindow?: (e: any, close: any) => React.ReactNode | React.ReactNode[];
  // 是否是自定义marker
  isCustomMarker?: boolean;
};

const AKAY = "31rWMGM33m58VzlWFRU9w093B54TDiKO";

const MapView = (props: MapViewProps) => {
  const mapRef = useRef<any>(null);
  const {
    className,
    mapExtraRender,
    mapRef: mapRefFn,
    markerList,
    mapClickWindow,
    isCustomMarker = true,
  } = props;
  const [infoWindow, setInfoWindow] = useState<any>({});
  const [infoWindowClick, setInfoWindowClick] = useState<any>({});
  // 需要向外抛出的方法
  useImperativeHandle(mapRefFn, () => {
    return {
      map: mapRef?.current,
      // 也可以在这里添加其他方法
    };
  });
  const parkData = areaMask(parkCode);
  const { list, point, zoom } = parkData;

  const MapOnLoad = (map: any) => {
    if (!map) return;
    map?.target?.setMapStyleV2({
      styleJson: mapStyles,
    });

    // 添加掩模
    const path = list?.map((item: any) => {
      return new BMapGL.Point(item[0], item[1]);
    });

    // map?.target?.setViewport(path);
    // 中心点
    map?.target?.setCenter(point);

    // const mapmask = new BMapGL.MapMask(path, {
    //     isBuildingMask: true, // 对楼块进行隐藏
    //     isPoiMask: true, // 对poi标注进行隐藏
    //     isMapMask: true, // 对底图进行隐藏
    //     showRegion: 'inside',
    //     fillColor: '#68FFF6',
    // });

    // var border = new BMapGL.Polyline(path, {
    //     strokeColor: '#68FFF6',
    //     strokeWeight: 2,
    //     strokeOpacity: 1
    // });

    // map?.target?.addOverlay(border);

    // map?.target?.addOverlay(mapmask);
    addAreaMask(map?.target, path);
  };

  // 划过
  const InfoWindowMemo = useMemo(() => {
    if (!infoWindow?.lng) return null;
    console.log("infoWindow", infoWindow);
    return (
      <CustomOverlay
        position={{ lng: infoWindow.lng, lat: infoWindow.lat }}
        zIndex={999}
      >
        <div className={cs([styles.label, "label"])}>{infoWindow.title}</div>
      </CustomOverlay>
    );
  }, [infoWindow]);

  // 点击
  const InfoWindowClickMemo = useMemo(() => {
    if (!infoWindowClick?.lng) return null;
    return (
      <div className={styles.infoWindow}>
        {mapClickWindow?.(infoWindowClick, setInfoWindowClick)}
      </div>
    );
  }, [infoWindowClick]);

  // 自定义marker
  const CustomMarker = useMemo(() => {
    console.log("markerList", markerList);
    const isNullMarkerLngLatList = markerList?.filter((item: any) => {
      return item.lng && item.lat;
    });
    if (isCustomMarker) {
      return isNullMarkerLngLatList?.map((item, index) => {
        return (
          <Marker
            // color={item.color}
            onClick={(e, item) => {
              mapRef.current?.map?.setCenter({ lng: item.lng, lat: item.lat });
              setInfoWindowClick({
                ...item,
                lng: item.lng,
                lat: item.lat,
                title: item.name,
              });
              setInfoWindow(null);
            }}
            onMouseEnter={(e, item) => {
              setInfoWindow({
                lng: item.lng,
                lat: item.lat,
                title: item.name,
              });
              // setInfoWindowClick(null)
            }}
            onMouseLeave={(e, item) => {
              setInfoWindow({});
            }}
            {...item}
            position={{ lng: item.lng, lat: item.lat }}
            zIndex={99}
            key={index}
          />
        );
      });
    }

    return isNullMarkerLngLatList?.map((item: any, index) => {
      const icons = item?.icons;
      return (
        <CustomOverlay
          key={index}
          position={{ lng: item.lng, lat: item.lat }}
          zIndex={99}
        >
          <div
            onClick={(e) => {
              mapRef.current?.map?.setCenter({ lng: item.lng, lat: item.lat });
              setInfoWindowClick({
                ...item,
                lng: item.lng,
                lat: item.lat,
                title: item.name,
              });
              setInfoWindow(null);
            }}
            onMouseEnter={(e) => {
              setInfoWindow({
                lng: item.lng,
                lat: item.lat,
                title: item.name,
              });
              // setInfoWindowClick(null)
            }}
            onMouseLeave={(e) => {
              setInfoWindow({});
            }}
            className={styles.marker}
            style={{
              background: `url(${icons?.url})`,
              width: icons?.w,
              height: icons?.h,
            }}
          ></div>
        </CustomOverlay>
      );
    });
  }, [isCustomMarker, markerList]);

  return (
    <div className={cs(styles.map_container, className)}>
      <APILoader akay={AKAY} type="webgl">
        <Map
          ref={mapRef}
          enableScrollWheelZoom
          zoom={zoom}
          // center={{ lng: 123.314823, lat: 41.644406 }}
          // minZoom={12}
          // autoLocalCity
          onLoad={MapOnLoad}
        >
          {CustomMarker}
          {InfoWindowMemo}
        </Map>
      </APILoader>
      {InfoWindowClickMemo}
      {mapExtraRender?.(mapRef.current)}
    </div>
  );
};
export default MapView;
