var SettingsModal = Backbone.View.extend({
    el: $("#modal-settings"),

    initialize: function() {
        var settings = this.model;
        this.model.on('change:items', this.render, this);

        $("#modal-settings").on("shown", function () {
            $("#history-count").focus();
            pm.layout.onModalOpen("#modal-settings");
        });

        $("#modal-settings").on("hidden", function () {
            pm.layout.onModalClose();
        });

        $('#history-count').change(function () {
            settings.setSetting("historyCount", $('#history-count').val());
        });

        $('#auto-save-request').change(function () {
            var val = $('#auto-save-request').val();
            if (val === "true") {
                settings.setSetting("autoSaveRequest", true);
            }
            else {
                settings.setSetting("autoSaveRequest", false);
            }
        });

        $('#retain-link-headers').change(function () {
            var val = $('#retain-link-headers').val();
            if (val === "true") {
                settings.setSetting("retainLinkHeaders", true);
            }
            else {
                settings.setSetting("retainLinkHeaders", false);
            }
        });

        $('#send-no-cache-header').change(function () {
            var val = $('#send-no-cache-header').val();
            if (val === "true") {
                settings.setSetting("sendNoCacheHeader", true);
            }
            else {
                settings.setSetting("sendNoCacheHeader", false);
            }
        });

        $('#send-postman-token-header').change(function () {
            var val = $('#send-postman-token-header').val();
            if (val === "true") {
                settings.setSetting("sendPostmanTokenHeader", true);
            }
            else {
                settings.setSetting("sendPostmanTokenHeader", false);
            }
        });

        $('#use-postman-proxy').change(function () {
            var val = $('#use-postman-proxy').val();
            if (val === "true") {
                settings.setSetting("usePostmanProxy", true);
                $('#postman-proxy-url-container').css("display", "block");
            }
            else {
                settings.setSetting("usePostmanProxy", false);
                $('#postman-proxy-url-container').css("display", "none");
            }
        });

        $('#postman-proxy-url').change(function () {
            settings.setSetting("postmanProxyUrl", $('#postman-proxy-url').val());
        });

        $('#variable-delimiter').change(function () {
            settings.setSetting("variableDelimiter", $('#variable-delimiter').val());
        });

        $('#language-detection').change(function () {
            settings.setSetting("languageDetection", $('#language-detection').val());
        });

        $('#have-donated').change(function () {
            var val = $('#have-donated').val();
            if (val === "true") {
                pm.layout.hideDonationBar();
                settings.setSetting("haveDonated", true);
            }
            else {
                settings.setSetting("haveDonated", false);
            }
        });

        $('#force-windows-line-endings').change(function () {
            var val = $('#force-windows-line-endings').val();
            if (val === "true") {
                settings.setSetting("forceWindowsLineEndings", true);
            }
            else {
                settings.setSetting("forceWindowsLineEndings", false);
            }
        });

        $("#download-all-data").on("click", function() {
            pm.indexedDB.downloadAllData(function() {
                noty(
                {
                    type:'success',
                    text:'Saved the data dump',
                    layout:'topRight',
                    timeout:750
                });
            });
        });

        $("#import-all-data-files-input").on("change", function(event) {
            console.log("Process file and import data");
            var files = event.target.files;
            pm.indexedDB.importAllData(files, function() {
                $("#import-all-data-files-input").val("");
                noty(
                {
                    type:'success',
                    text:'Imported the data dump',
                    layout:'topRight',
                    timeout:750
                });
            });
        });

        $("#clear-local-cache").on("click", function(event) {
            console.log("Clear local cache files");
            //Write code to clear RAL files
            RAL.FileSystem.removeDir('cache', function() {
                console.log("All clear");
            });
        });

        $(document).bind('keydown', 'shift+/', function () {
            if(pm.layout.isModalOpen) {
                return;
            }

            $('#modal-settings').modal({
                keyboard: true
            });

            $('#modal-settings').modal('show');
            $('#modal-settings a[href="#settings-shortcuts"]').tab('show');
        });

        if (this.model.getSetting("usePostmanProxy") === true) {
            $('#postman-proxy-url-container').css("display", "block");
        }
        else {
            $('#postman-proxy-url-container').css("display", "none");
        }

        this.render();
    },

    render: function() {
        $('#history-count').val(this.model.getSetting("historyCount"));
        $('#auto-save-request').val(this.model.getSetting("autoSaveRequest") + "");
        $('#retain-link-headers').val(this.model.getSetting("retainLinkHeaders") + "");
        $('#send-no-cache-header').val(this.model.getSetting("sendNoCacheHeader") + "");
        $('#send-postman-token-header').val(this.model.getSetting("sendPostmanTokenHeader") + "");
        $('#use-postman-proxy').val(this.model.getSetting("usePostmanProxy") + "");
        $('#postman-proxy-url').val(this.model.getSetting("postmanProxyUrl"));
        $('#variable-delimiter').val(this.model.getSetting("variableDelimiter"));
        $('#language-detection').val(this.model.getSetting("languageDetection"));
        $('#have-donated').val(this.model.getSetting("haveDonated") + "");
    }
});