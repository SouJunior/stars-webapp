import { defineStore } from 'pinia'
import volunteerService from '@/services/volunteer.js'
import { ref } from 'vue'

export const useVolunteerStore = defineStore('volunteer', () => {
    const member = ref([]);
    const volunteer = ref([]);

    async function fetch(uuidSquad) {
        try {
            const response = await memberService.fetchBy(uuidSquad);
            const data = response;

            if (data.error) {
                alert(data.error)
                return;
            } else {
                member.value = data
            }
        } catch (error) {
            alert('Catch: ' + error)
        }
    }

    async function fetchByEmail(email) {
        try {
            const response = await volunteerService.fetchByEmail(email);
            const data = response;

            if (data.error) {
                alert(data.error)
                return;
            } else {
                volunteer.value = data
            }
        } catch (error) {
            alert('Catch: ' + error)
        }
    }

    async function create(volunteer) {
        console.log('store volunteer :', volunteer);
        try {
            const response = await volunteerService.create(volunteer);
            const data = response;

            if (data.error) {
                alert(data.error)
                return;
            } 
        } catch (error) {
            alert('Catch: ' + error)
        }
    }

    async function update(member) {
        try {
            const response = await memberService.update(member);
            const data = response;

            if (data.error) {
                alert(data.error)
                return;
            } else {
                fetch(data.member.squad_uuid)
            }
        } catch (error) {
            alert('Catch: ' + error)
        }
    }

    async function del(uuidSquad, UuidMember) {
        try {
            const response = await memberService.del(uuidSquad, UuidMember);
            const data = response;

            if (data.error) {
                alert(data.error)
                return;
            } else {
                fetch(uuidSquad)
            }
        } catch (error) {
            alert('Catch: ' + error)
        }
    }

    return { 
        volunteer, 
        fetch,
        create,
        update,
        del,
        fetchByEmail
    }
}, 
    { 
        persist: true 
    }
)
