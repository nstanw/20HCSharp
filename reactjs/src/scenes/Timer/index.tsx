import * as React from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import type { IFilterDto } from '../../models/IFilterDto';
import { pushFilterDto2 } from '../../utils/pushFilterDto2';


const TraCuuBanGiaoKhoans = observer(() => {
  const [pageSize, ] = React.useState(20);
  const [skipCount, ] = React.useState(0);
  const [loaiGiaoKhoan] = React.useState('all');
  const [, setIsLoadding] = React.useState(false);
  const defaultFilter = [
    { property: 'loaigiaokhoan', value: 'all', operator: 'eq' },
  ];
  const [filterDtos] = React.useState<IFilterDto[]>(defaultFilter);


  const getAllViewGiaoKhoans = async () => {
    try {
      setIsLoadding(true);
      pushFilterDto2(filterDtos, {
        property: 'loaigiaokhoan',
        value: loaiGiaoKhoan,
        operator: 'eq',
      });
    //   const giaoKhoans = await giaoKhoanService.getAll({
    //     filter: JSON.stringify(filterDtos),
    //     limit: pageSize,
    //     start: skipCount,
    //   });
    //  setViewGiaoKhoans(giaoKhoans);
      setIsLoadding(false);
    } catch (error) {
      setIsLoadding(false);
    }
  };

  React.useEffect(() => {
    (async function run() {
      getAllViewGiaoKhoans();
    })();
  }, [filterDtos,skipCount, pageSize]);

//   const handleOnRow = (record: ViewGiaoKhoan) => {
//     history.push('/CongTrinhs/GiaoKhoan/' + record.id);
//   };

  return (
    <Card>
      <></>
    </Card>
  );
});
export default TraCuuBanGiaoKhoans;
