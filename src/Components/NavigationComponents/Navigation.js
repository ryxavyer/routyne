import Logout from './Logout'
import Username from './Username'
import Level from './Level'
import Updates from './Updates'
import GoldDivider from '../GoldDivider'

const Navigation = ({ session, username, status, level, xp, handleStatusUpdate, setError, setInSessionView }) => {
    return (
        <div className='flex flex-row border-routyneGold border-b-2 py-2'>
            <div className='self-center text-center mx-8 text-3xl cursor-pointer' onClick={() => setInSessionView(false)}>routyne</div>
            <div className='flex flex-row justify-end w-full h-1/4 shadow-sm py-5 px-5'>
                <Level session={session} level={level} xp={xp}/>
                {/* <Motivation/> */}
                <Username session={session} username={username} initialStatus={status}/>
                <GoldDivider/>
                <Updates session={session}/>
                <Logout handleStatusUpdate={handleStatusUpdate} setError={setError}/>
            </div>
        </div>
      )
}

export default Navigation;