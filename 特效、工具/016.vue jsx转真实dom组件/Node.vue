<script setup lang="tsx">
export const WNode = defineComponent({
  props: {
    content: {
      type: Object,
    },
  },
  render(): any {
    return this.content
  },
})

</script>
