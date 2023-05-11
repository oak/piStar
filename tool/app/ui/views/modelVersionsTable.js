/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

ui.components = ui.components || {};  //prevents overriding the variable, while also preventing working with a null variable

ui.components.ModelVersionsTableView = Backbone.View.extend({
    template: _.template($('#model-and-versions-table-template').html()),

    initialize: function () {
        'use strict';

        this.$table = $('#modal-load-model-from-local-storage-table');
    },

    render: function () {
        'use strict';

        this.renderElement();
        this.setupElementClick();
    },

    renderElement: function () {
        'use strict';

        this.$table.find('tbody').html('');
        this.model.forEach((item) => {
            item.versions.forEach((version) => {
                this.$table.find('tbody').append(this.template({
                    modelName: item.model,
                    modelPath: version,
                }));
            })
        });
    },
    setupElementClick: function () {
        'use strict';

        this.$table.find('a').click((e) => {
            let modelName = $(e.target).attr('data-name');
            let modelVersion = $(e.target).attr('data-pk');

            console.log(modelName, modelVersion)
            const model = istar.fileManager.loadModelFromLocalStorage(modelName, modelVersion);

            if (model) {
                ui.resetCellDisplayStates();
                istar.fileManager.loadModel(model);//do the actual loading
                ui.selectPaper();//select the model (as a whole)

                $('#modal-load-model-from-local-storage').modal('hide');
            } else {
                ui.alert('Sorry, this kind of file is not valid', 'Error loading file');
                $('#modal-load-model-from-local-storage').modal('hide');
            }
        });
    },
});
