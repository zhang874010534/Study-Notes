<template>
    <div>
        <input type="file" @change="change" />
    </div>
</template>
<script>
import * as xlsx from 'xlsx'
// https://www.cnblogs.com/liuxianan/p/js-excel.html
export default {
    data() {
        return {

        }
    },

    mounted() {
        console.log(xlsx)
    },

    methods: {
        change(e) {
            console.log(e.target.files[0])
            const file = e.target.files[0]
            let reader = new FileReader()
            reader.onload = (e) => {
                const binary = e.target.result
                const wordbook = xlsx.read(binary, { type: 'binary' })
                console.log(wordbook)
                const sheetNames = wordbook.SheetNames
                console.log(sheetNames,'sheetNames')
                const sheets = wordbook.Sheets
                console.log(sheets)
                const json = xlsx.utils.sheet_to_json(sheets[sheetNames[0]])
                console.log(json)
            }
            reader.readAsBinaryString(file)

        }
    },
}
</script>