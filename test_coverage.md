# doger.js test coverage

`t` indicates that a test exists

`r` indicates that a function is documented in `README.md`

## the list

### doge generator functions:
		r	"doger"
	t	r	"keywords_to_doge_text"
	t	r	"make_doge_html"
			"make_doge_image"
	t	r	"doge_image"
			"get_keywords_from_query_string"

### keyword extractor functions:
	t	r	"keywords_from_url"
	t	r	"keywords_from_text"

### bookmarklet:
			"bookmarklet"

### utility functions:
			"get_selected_text"
	t		"get_query_string"
	t		"check_for_url"
	t		"random_from_array"
			"shuffle_array"
	t		"random_color"
	t		"http_get"
			"download_data_uri"
			"load_image"
			"load_script"
			"make_blob"