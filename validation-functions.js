$(document).ready(function() {
    $('#quote-form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },        
        fields: {
            issueNumber: {
             message: 'Please enter the issue number',
                validators: {
                    notEmpty: {
                        message: 'Issue number is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[\d#]+$/,
                        message: 'Issue number can only accept numbers and # symbol input'
                    },
                }
            },
            estimatedHours: {
             message: 'Please enter estimated hours',
                validators: {
                    notEmpty: {
                        message: 'Estimated hours are required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[\d-]+$/,
                        message: 'Estimated hours can accept only numbers and dash symbol'
                    },
                }
            }
        }
    })
    .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        var url = 'https://script.google.com/macros/s/AKfycbxjpvS9K1UPxhCgsCu4dvIxz5hAHiImtRwphm8QTP3Ao7AFub4a/exec';
        var redirectUrl = 'quote-success.html';
        
        // show the loading 
        $('#btnPostForm').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));
        var jqxhr = $.post(url, $form.serialize(), function(data) {
            console.log("Success! Data: " + data);
            if(data.result == "success"){
                $(location).attr('href',redirectUrl);
            }
        })
            .fail(function(data) {
                console.warn("Error! Data: " + data.statusText);
                // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
                if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                    alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
                    $(location).attr('href',redirectUrl);                
                }
            });
    });
});
