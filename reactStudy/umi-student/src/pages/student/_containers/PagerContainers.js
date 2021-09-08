import Pager from '@/components/Pager'
import { connect } from 'umi';

const mapStateToProps = state => ({
    current:state.students.condition.page,
    total:state.students.result.total,
    limit:state.students.condition.limit,
    panelNumber:5
})

const mapDispatchToProps = dispatch => ({
    onPageChange(newPage){
        dispatch({
            type:'students/setCondition',
            payload:{
                page:newPage
            }
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Pager);