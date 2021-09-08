import Loading from '@/components/Loading.js'
import { connect } from 'umi';

const mapStateToProps = state => ({
    show:state.loading.effects["students/getStudent"]
})

export default connect(mapStateToProps)(Loading);