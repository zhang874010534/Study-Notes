<script>
// https://github.com/dolanmiu/docx
import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  TextRun,
  Table,
  TableCell,
  TableRow,
  Header,
  Footer,
  HeadingLevel,
  AlignmentType,
  TableOfContents,
  StyleLevel,
  WidthType,
  convertInchesToTwip,
  ShadingType,
} from 'docx'
export default {
  methods: {
    exportWord () {
      this.contentType = 'detail'
      this.loading = true
      // 测试
      // const doc = new Document({
      //   sections: [
      //     {
      //       children: [
      //         new Table({
      //           columnWidths: [1000, 300, 300, 300],
      //           rows: [
      //             new TableRow({
      //               children: [
      //                 new TableCell({
      //                   children: [new Paragraph({
      //                     alignment: AlignmentType.CENTER,
      //                     children: [
      //                       new TextRun({
      //                         text: '56',
      //                       })
      //                     ]
      //                   })],
      //                 }),
      //                 new TableCell({
      //                   children: [new Paragraph('11')],
      //                 }),
      //                 new TableCell({
      //                   children: [new Paragraph('22')],
      //                 }),
      //                 new TableCell({
      //                   children: [new Paragraph('33')],
      //                 }),
      //               ],
      //             }),
      //           ],
      //         }),
      //         new Table({
      //           rows: [
      //             new TableRow({
      //               children: [
      //                 new TableCell({
      //                   children: [new Paragraph('44')],
      //                 }),
      //                 new TableCell({
      //                   children: [new Paragraph('12')],
      //                 }),
      //                 new TableCell({
      //                   children: [new Paragraph('100%')],
      //                 }),
      //                 new TableCell({
      //                   children: [new Paragraph('100%')],
      //                 }),
      //               ],
      //             }),
      //           ],
      //         })
      //       ],
      //     },
      //   ],
      // })
      //
      // Packer.toBlob(doc).then((blob) => {
      //   const downloadUrl = URL.createObjectURL(blob)
      //   downloadFile({
      //     url: downloadUrl,
      //     name: `${this.record.summaryName}.docx`,
      //   })
      // })
      // return

      this.$nextTick(async () => {
        const summaryContentDetailRef = this.$refs.summaryContentDetailRef
        // const summaryList = summaryContentDetailRef.summaryList

        const summaryList = []
        const defectList = []
        for (const sheetItem of summaryContentDetailRef.sheetList) {
          await summaryContentDetailRef.selectSheetPromise(sheetItem)
          console.log(this.$refs.summaryContentDetailRef.getAllData(),'ss')
          const allData = this.$refs.summaryContentDetailRef.getAllData()
          summaryList.push(
              new Paragraph({
                spacing: {
                  before: 100,
                },
              }),
              new Table({
                // 设置2列的宽度
                margins: {
                  top: convertInchesToTwip(0.1),
                  bottom: convertInchesToTwip(0.1),
                  right: convertInchesToTwip(0.1),
                  left: convertInchesToTwip(0.1),
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        columnSpan: 2,
                        children: [
                          new Paragraph(sheetItem.checkSheetName)
                        ]
                      })
                    ]
                  }),
                  ...allData.qualitySummaryList.map(item => {
                    return new TableRow({
                      children: [
                        new TableCell({
                          width: {
                            size: 1300,
                            type: WidthType.DXA,
                          },
                          // 垂直居中
                          verticalAlign: 'center',
                          children: [new Paragraph({
                            children: [
                              new TextRun({
                                text: item.statisticsConfigName,
                              })
                            ]
                          })],
                        }),
                        new TableCell({
                          width: {
                            size: 8000,
                            type: WidthType.DXA,
                          },
                          children: item.taskResList.map(tskResItem => {
                            return new Paragraph(tskResItem.checkSheetSummaryDetail || '')
                          }),
                        }),
                      ],
                    })
                  })
                ],
              })
          )

          allData.summaryList.forEach(item => {
            if (item.echartUrl) {
              // 表格
              defectList.push(new Paragraph({
                spacing: {
                  before: 200,
                  after: 100,
                },
                children: [
                  new TextRun({
                    text: item.statisticsName,
                    size: 22,
                  })
                ]
              }))
              // 表格
              defectList.push(
                  new Table({
                    margins: {
                      top: convertInchesToTwip(0.1),
                      bottom: convertInchesToTwip(0.1),
                      right: convertInchesToTwip(0.1),
                      left: convertInchesToTwip(0.1),
                    },
                    rows: [
                      new TableRow({
                        children: item.headNameList.map(headNameItem => {
                          return new TableCell({
                            shading: {
                              type: ShadingType.CLEAR,
                              fill: 'EEF5F9', // 背景颜色
                              // color: 'EEF5F9', // 文字颜色
                            },
                            children: [new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: headNameItem.label,
                                  color: '0D5273', // 文字颜色
                                  bold: true,
                                })
                              ]
                            })],
                          })
                        }),
                      }),
                      ...item.detailResList.map(detailResItem => {
                        return new TableRow({
                          children: [
                            new TableCell({
                              width: {
                                size: 4000,
                                type: WidthType.DXA,
                              },
                              children: [new Paragraph(detailResItem.contentName)],
                            }),
                            new TableCell({
                              width: {
                                size: 1300,
                                type: WidthType.DXA,
                              },
                              children: [new Paragraph(String(detailResItem.defectNo))],
                            }),
                            new TableCell({
                              width: {
                                size: 1300,
                                type: WidthType.DXA,
                              },
                              children: [new Paragraph(detailResItem.percentage)],
                            }),
                            new TableCell({
                              width: {
                                size: 1600,
                                type: WidthType.DXA,
                              },
                              children: [new Paragraph(detailResItem.addPercentage)],
                            }),
                          ]
                        })
                      }),
                    ],
                  })
              )
              // 图表
              defectList.push(new Paragraph({
                spacing: {
                  before: 200,
                },
                children: [
                  new ImageRun({
                    type: 'png',
                    data: item.echartUrl,
                    transformation: {
                      width: item.echartWidth,
                      height: item.echartHeight,
                    },
                    // outline: {
                    //   type: 'solidFill',
                    //   solidFillType: 'rgb',
                    //   value: 'FF0000',
                    // },
                  })
                ]
              }))
            }
          })
        }
        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: this.record.summaryName,
                      bold: true,
                      size: 30,
                    })
                  ]
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: '时间：',
                    }),
                    new TextRun({
                      text: this.record.checkTime,
                    }),
                  ]
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                  },
                  children: [
                    new TextRun({
                      text: '项目：',
                    }),
                  ]
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                  },
                  children: this.$refs.summaryContentDetailRef.sheetList.map(item => {
                    return new TextRun({
                      text: item.checkSheetName,
                    })
                  }),
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                  },
                  children: [
                    new TextRun({
                      text: '一、汇总:',
                      bold: true,
                      size: 25,
                    }),
                  ]
                }),
                ...summaryList,
                new Paragraph({
                  spacing: {
                    before: 200,
                  },
                  children: [
                    new TextRun({
                      text: '二、汇总2：',
                      bold: true,
                      size: 25,
                    }),
                  ]
                }),
                ...defectList,
                new Paragraph({
                  spacing: {
                    before: 200,
                  },
                  children: [
                    new TextRun({
                      text: '三、答案:',
                      bold: true,
                      size: 25,
                    }),
                  ]
                }),
              ],
            },
          ],
        })
        // Used to export the file into a .docx file
        Packer.toBlob(doc).then((blob) => {
          const downloadUrl = URL.createObjectURL(blob)
          downloadFile({
            url: downloadUrl,
            name: `${this.record.summaryName}.docx`,
          })
          this.loading = false
        })
      })
    }
  }
}
</script>
