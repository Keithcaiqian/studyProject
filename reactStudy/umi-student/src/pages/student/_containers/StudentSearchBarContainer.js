import StudentSearchBar from '../components/StudentSearchBar'
import { connect } from 'umi';

const mapStateToProps = state => ({
    defaultValue:{
        key:state.students.condition.key,
        sex:state.students.condition.sex
    }
})

const mapDispatchToProps = dispatch => ({
    onSearch(condition){
        condition.page = 1;
        dispatch({
            type:'students/setCondition',
            payload:condition
        })
        dispatch({
            type:'students/getStudent'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(StudentSearchBar);