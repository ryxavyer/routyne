import { useState } from "react"
import { supabase } from "../supabaseClient"

const ListCard = ({ session, lists, updateLists, selectedIndex, setSelectedIndex, handleListClick, handleError }) => {
    const [newList, setNewList] = useState("")

    const updateNewList = (e) => {
        const input = (e.target.value).toString()
        setNewList(input)
    }

    const saveNewList = async (e) => {
        e.preventDefault()
        const cleanedList = newList.trim()
        if (cleanedList === "") {
            handleError("You must give new lists a name")
            return
        }
        try {
            const { user } = session
            const { error } = await supabase
                .from('lists')
                .insert([
                    { user_id: user.id, name: cleanedList },
                ])
            if (error) throw error
        } catch (error) {
            handleError(error.error_description || error.message)
            return
        }

        setNewList("")
        updateLists()
    }

    const deleteList = async (id) => {
        try {
            const { error } = await supabase
                .from('lists')
                .delete()
                .eq('id', id)
            if (error) throw error
        } catch (error) {
            handleError(error.error_description || error.message)
            return
        }
        updateLists()
    }

    return (
        <div className='flex flex-col w-4/6 mx-auto my-8 md:w-1/4 md:mx-4'>
            <form onSubmit={(e) => saveNewList(e)} className="flex flex-row">
                <input className="bg-transparent w-full border-b-2 self-center py-1 placeholder:text-white placeholder:text-sm placeholder:opacity-50 focus:outline-none" placeholder='Add a list...' value={newList} onChange={(e) => updateNewList(e)}></input>
                <button type='submit' hidden className="w-24 rounded-lg bg-routyneGold self-center py-2 hover:bg-routyneGoldLight">CREATE</button>
            </form>
            <div className="flex flex-col">
                {lists.map((list, index) => {
                    return (
                        <div className="flex flex-row mb-2" key={`${list.id}_div`}>
                            <div className={`${index === selectedIndex ? 'bg-routyneGold' : 'bg-itemColor'} rounded-sm w-full p-2.5 cursor-pointer focus:outline-none`} key={list.id} onClick={() => handleListClick(index, list.id)}>
                                {list.name}
                            </div>
                            <button className="h-[46px] rounded-sm text-xs bg-white bg-opacity-5 self-center p-4 hover:bg-red-900" key={`${list.id}_button`} onClick={() => deleteList(list.id)}>
                                X
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default ListCard;