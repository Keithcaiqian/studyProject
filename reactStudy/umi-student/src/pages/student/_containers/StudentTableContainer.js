import StudentTable from '../components/StudentTable'
import { connect } from 'umi';

const mapStateToProps = ({students}) => ({
    studentList:students.result.list
})

export default connect(mapStateToProps)(StudentTable);