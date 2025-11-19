import { ref } from 'vue'
import { defineStore } from 'pinia'
// import axiosInstance from '@/services/http.js'
import productRequest from '@/services/product.js'
import { useAuthStore } from './auth.js'
import { useSnackbarStore } from './snackbar.js'
import jobtitleService from '@/services/jobtitle.js'

import router from "@/router";

export const useJobtitleStore = defineStore('jobtitle', () => {
    const tt  = useAuthStore()
    const products = ref([])
    const product = ref({})
    const data = ref({})

    const useSnackbar = useSnackbarStore()

    async function fetchJobtitles() {
        data.value = await jobtitleService.fetch()
        return data.value
    }

    async function getProductsByUuid() {
        return products.value.filter((product) => {

            return product.owner_uuid == tt.getUuid()
        })
    }

    async function getProduct(uuid) {
        product.value = await productRequest.show(uuid)

        return product.value
    }

    async function byUser(uuid) {
        products.value = await productRequest.byUser(uuid)
        return products.value
    }

    async function del(uuid) {
        await productRequest.del(uuid)

        await tt.fetchProducts(tt.getUuid())

        router.push('/onboarding' );
        //return products.value
    }

    async function create(product) {
        const p = await productRequest.create(product)
        console.log('product created:', p);

        if (p.statusCode == 200) {
            await tt.fetchProducts(tt.getUuid())
            useSnackbar.showSnackbar({
                text: 'Product created successfully',
                color: 'success',
                timeout: 3000
            })
            router.push('/product/' + p.product.uuid);
        }
        // return products.value
    }

    async function update(product) {
        console.log('product update:', product);
        const p =  await productRequest.update(product)
        console.log('product updated:', p);
        if (p.statusCode == 200) {
            await tt.fetchProducts(tt.getUuid())

            useSnackbar.showSnackbar({
                text: 'Produto atualizado com sucesso',
                color: 'success',
                timeout: 3000
            })

            router.push('/product/' + product.uuid);
        }
        // return products.value
    }

    return { 
        products, 
        fetchJobtitles,
        getProductsByUuid,
        getProduct,
        product,
        byUser,
        del,
        create,
        update,
        data
    }
}, 
    { 
        persist: true 
    }
)
