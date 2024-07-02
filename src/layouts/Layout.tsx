/*
 * @Author: yoke m17633465271@163.com
 * @Date: 2023-03-14 10:44:03
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-05-27 19:34:12
 * @FilePath: /brain-bigs-web/src/layouts/Layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import cs from "classnames";
import styles from "./layout.module.less";
import { isNanChang, systemList } from "./constat";
import Tabs from "@/components/Tabs";
import { useEnergyData, useTabs } from "@/store";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TabsContainer from "@/components/TabsContainer";
// import CarbonLeft from "@/pages/FleetManagement/CarbonLeft";
// import CarbonRight from "@/pages/FleetManagement/CarbonRight";
// import CarbonCenter from "@/pages/FleetManagement/CarbonCenter";
import EnergyLeft from "@/pages/EnergyConsumption/EnergyLeft";
import EnergyCenter from "@/pages/EnergyConsumption/EnergyCenter";
import EnergyRight from "@/pages/EnergyConsumption/EnergyRight";
// import RegionalLeft from "@/pages/RegionalOverview/RegionalLeft";
// import RegionalRight from "@/pages/RegionalOverview/RegionalRight";
// import RegionalCenter from "@/pages/RegionalOverview/RegionalCenter";
// import CarbonFootLeft from "@/pages/CarbonFootprint/CarbonFootLeft";
// import CarbonFootCenter from "@/pages/CarbonFootprint/CarbonFootCenter";
// import CarbonFootRight from "@/pages/CarbonFootprint/CarbonFootRight";
// import InclusionLeft from "@/pages/CarbonInclusion/InclusionLeft";
// import InclusionCenter from "@/pages/CarbonInclusion/InclusionCenter";
// import InclusionRight from "@/pages/CarbonInclusion/InclusionRight";
// import AssessmentLeft from "@/pages/ProjectAssessment/AssessmentLeft";
// import AssessmentCenter from "@/pages/ProjectAssessment/AssessmentCenter";
// import AssessmentRight from "@/pages/ProjectAssessment/AssessmentRight";
import { useEffect } from "react";
import useSearch from "./useSearch";
import { SystemIdEnums } from "@/enums/System";
// import NRegionalLeft from "@/pages/RegionalOverview/NRegionalLeft";
// import NRegionalRight from "@/pages/RegionalOverview/NRegionalRight";
import { systemMain } from "@/service/global";
import { RESPONSECODE } from "@/enums/global";
import {
  instants,
  list,
  total_energy,
  total_electric,
} from "@/constat/instant";
import { cloneDeep } from "lodash-es";
import {
  handleArraySection,
  handleNumberUnit,
  isBetWeenArr,
} from "@/utils/number";
const Layout = () => {
  const useTabsLine: any = useTabs();
  const energyData: any = useEnergyData();
  const { loading, data } = useSearch();

  console.log(isNanChang, "..........");

  

  // if (loading) return null;
  useEffect(() => {
    systemMain().then((res) => {
      if (res?.code == RESPONSECODE.SUCCESS) {
        // console.log(res?.data);
        const lists = list;
        lists[1]["value"] = res?.data?.energyTonConsumption;
        let data = instants;
        data["heat"] = 0.129977436;
        data["comprehensiveConsumption"] = 23318700;
        data["electricityConsumption"] = 1999280;
        data["electricityShow"] = 1999280 / 10000;
        data["coal"] = 0.009624041;
        data["gas"] = 18.193448;
        const datas = lists.map((item: any) => {
          const units = handleNumberUnit(data?.[item.dataIndex]);
          return {
            ...item,
            units: units?.unit,
            value: units?.value,
          };
        });
        const total_energys = [
          ...total_energy,
          { key: "2024", value: res?.data?.energyTonConsumption },
        ];
        const total_electrics = [
          ...total_electric,
          { key: "2024", value: res?.data?.energyConsumption },
        ];
        // console.log(total_electrics);
        // energyData.setDataEnergy(data);
        energyData.setValues({
          leftList: datas,
          data: data,
          total_energy: total_energys,
          total_electric: total_electrics,
          topList: res?.data?.topList,
          typeName: res?.data?.typeName,
          typeValue: res?.data?.typeValue,
        });
      }
    });
  }, []);

  return (
    <div className={styles.layout}>
      <Header data={data} />
      {/* <Tabs list={systemList(data)} value={useTabsLine.tabIndex} /> */}
      <Footer />
      <TabsContainer
        leftRender={(tabIndex: number) => {
          switch (tabIndex) {
            // case SystemIdEnums.OVER_VIEW_ID:
            //   if (isNanChang) {
            //     return <NRegionalLeft />;
            //   }
            //   return <RegionalLeft />;
            // case SystemIdEnums.CARBON_OVER_VIEW_ID:
            default:
              return <EnergyLeft />;
            case SystemIdEnums.ENERGY_ONLINE_ID:
              return <EnergyLeft />;
            // case SystemIdEnums.CARBON_FOOTPRINT_ID:
            //   return <CarbonFootLeft />;
            // case SystemIdEnums.CARBON_BENEFIT_ID:
            //   return <InclusionLeft />;
            // case SystemIdEnums.PROJECT_ENERGY_ASSESSMENT_ID:
            //   return <AssessmentLeft />;
          }
        }}
        centerRender={(tabIndex: number) => {
          switch (tabIndex) {
            // case SystemIdEnums.OVER_VIEW_ID:
            //   return <RegionalCenter />;
            // case SystemIdEnums.CARBON_OVER_VIEW_ID:
            default:
              return <EnergyCenter />;
            case SystemIdEnums.ENERGY_ONLINE_ID:
              return <EnergyCenter />;
            // case SystemIdEnums.CARBON_FOOTPRINT_ID:
            //   return <CarbonFootCenter />;
            // case SystemIdEnums.CARBON_BENEFIT_ID:
            //   return <InclusionCenter />;
            // case SystemIdEnums.PROJECT_ENERGY_ASSESSMENT_ID:
            //   return <AssessmentCenter />;
          }
        }}
        rightRender={(tabIndex: number) => {
          switch (tabIndex) {
            // case SystemIdEnums.OVER_VIEW_ID:
            //   if (isNanChang) {
            //     return <NRegionalRight />;
            //   }
            //   return <RegionalRight />;
            // case SystemIdEnums.CARBON_OVER_VIEW_ID:
            default:
              return <EnergyRight />;
            case SystemIdEnums.ENERGY_ONLINE_ID:
              return <EnergyRight />;
            // case SystemIdEnums.CARBON_FOOTPRINT_ID:
            //   return <CarbonFootRight />;
            // case SystemIdEnums.CARBON_BENEFIT_ID:
            //   return <InclusionRight />;
            // case SystemIdEnums.PROJECT_ENERGY_ASSESSMENT_ID:
            //   return <AssessmentRight />;
          }
        }}
      />
    </div>
  );
};

export default Layout;
