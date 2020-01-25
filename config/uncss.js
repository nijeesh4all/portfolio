const uncss = require('uncss');
const fs = require('fs')

const dist_dir = '../dist'

const html_files = [`${dist_dir}/index.html`]

const css_files = fs.readdirSync(dist_dir)
    .filter(file_name => {
        return (/^.+\.css$/).test(file_name)
    })
    .map(file_name => {
        return `${dist_dir}/${file_name}`
    });


if (!css_files || !css_files[0])
    exit('No CSS file Found')

let total_css_size = css_files.reduce((size, file_name)=>{
    const stats = fs.statSync(file_name)
    return size + stats.size / 1000.0
},0)

const options = {
    htmlroot: dist_dir,
    ignoreSheets: [/fonts.googleapis/],
    stylesheets: css_files
};


uncss(html_files, options, function (error, output) {
    fs.writeFileSync(css_files[0], output, function (err) {
        if (err) throw err;
        console.log('Uncssed');
    });
});

let current_file_size = fs.statSync(css_files[0]).size / 1000.0

console.log(`css size ${total_css_size}KB -> ${current_file_size}KB`)