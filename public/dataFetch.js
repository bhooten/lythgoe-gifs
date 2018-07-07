$.get("https://api.apify.com/v1/3LbG8w5RRfFP8Nn5Q/crawlers/jkMfA3nhigsAuh9Dj/lastExec/results?token=6tzfEPCdRAusyx2AtJQLdc8ck", function (baseData) {
    let data = [...baseData[0].pageFunctionResult, ...baseData[1].pageFunctionResult, ...baseData[2].pageFunctionResult]

    let postTemplate = Handlebars.compile($('#postTemplate').html());

    $(data).each(i => {
        var tweetText = data[i].text;

        if (tweetText.length > 130) {
            tweetText = tweetText.substring(0, 100) + "...";
        }

        tweetText = encodeURIComponent(tweetText + " View more at " + data[i].threadLink);

        let element = postTemplate({
            "postText": data[i].text,
            "postDate": data[i].date,
            "threadTitle": data[i].threadTitle,
            "threadLink": data[i].threadLink,
            "tweetText": tweetText
        });

        $('#postList').append(element);
    });
});