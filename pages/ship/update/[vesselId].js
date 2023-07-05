import { removeData } from 'components/ship/action'
import Profile from 'components/ship/profile'
import EmailMessageList from 'components/ship/emsg'
import TradeList from 'components/ship/trade'
import EstimateList from 'components/ship/estimate'
import AttachmentList from 'components/ship/attachment'

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import UnderlinedTabs from 'src/base-components/tabs'
import Widget from 'src/components/widget'
import { formatInt } from 'src/functions/numbers'


const Index = () => {
  const router = useRouter()
  const tab = formatInt(router.query.tab)

  const tabs = [
    {
      index: 0,
      title: '基本資料',
      content: Profile
    },
    {
      index: 1,
      title: '電文記錄',
      content: EmailMessageList
    },
    {
      index: 2,
      title: '成交價',
      content: TradeList
    },
    {
      index: 3,
      title: '預估價',
      content: EstimateList
    },
    {
      index: 4,
      title: '附件清單',
      content: AttachmentList
    }
  ]



  return (
    <>
      <Widget title='檢視／修改／船舶資料'>
        <UnderlinedTabs tabs={tabs} activeTab={tab}/>
      </Widget>
    </>
  )
}

export default Index
