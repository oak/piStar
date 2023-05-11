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
            this.$table.find('tbody').append(this.template({
                modelName: item.model,
                modelPath: item.version,
            }));
        });
    },
    setupElementClick: function () {
        'use strict';

        this.$table.find('a[data-type="open"]').click((e) => {
            let modelName = $(e.currentTarget).attr('data-name');
            let modelVersion = $(e.currentTarget).attr('data-pk');

            const model = istar.fileManager.loadModelFromLocalStorage(modelName, modelVersion);

            if (model) {
                ui.resetCellDisplayStates();
                istar.fileManager.loadModel(model);//do the actual loading
                ui.selectPaper();//select the model (as a whole)

                $('#modal-load-model-from-local-storage').modal('hide');
            } else {
                ui.alert('An error occurred while loading this model', 'Error loading model');
                $('#modal-load-model-from-local-storage').modal('hide');
            }
        });

        this.$table.find('a[data-type="remove"]').click((e) => {
            let modelName = $(e.currentTarget).attr('data-name');
            let modelVersion = $(e.currentTarget).attr('data-pk');

            console.log('deleting', modelName, modelVersion);
            istar.fileManager.deleteModelFromLocalStorage(modelName, modelVersion);
        });
    },
});
