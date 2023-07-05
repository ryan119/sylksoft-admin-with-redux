import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import SectionTitle from 'src/components/section-title'
import {alive} from '../src/actions/common'


const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(alive())
  }, []);

  return (
    <>
      <SectionTitle title="Dashboard" subtitle="歡迎來到訊昌船舶管理系統"/>
    </>
  )
}

/*
List.getInitialProps = async (ctx) => {
  console.log('LeftSidebar: ', ctx.store)
  ctx.store.dispatch(getMenu())
  return { leftSide: 'Test'}
}
*/

export default Index
