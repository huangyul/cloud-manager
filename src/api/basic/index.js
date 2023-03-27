import { amesFetch } from "../../utils/axios/ames-http";

// 获取token
export function getToken() {
  return amesFetch({
    url: "/Token/GetToken",
    // TODO
    data: {
      AppId: "306750E7-AC9B-4BCF-8391-40C810E180CD",
      OrgId: "93EO5QE40000BQ1",
      UserId: "4UHEWPYVODG0170TRZ17BA33W02YKYSAVQAL4X",
    },
  });
}
