module.exports = {
    sortByEdit: function(list) {
        var sorted = list.sort(function(a, b) {
            return new Date(b.editDate) - new Date(a.editDate);
        });
        return sorted;
    },

    sortByEventDate: function(list) {
        var sorted = list.sort(function(a, b) {
            return new Date(a.eventDate) - new Date(b.eventDate);
        });
        return sorted;
    },

    sortByDate: function(list) {
        var sorted = list.sort(function(a, b) {
            return a.date - b.date;
        })
        return sorted;
    },

    sortByDateDescending: function(list) {
        var sorted = list.sort(function(a, b) {
            return b.date - a.date;
        })
        return sorted;
    },

    sortByName: function(list) {
        var sorted = list.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        return sorted;
    },

    sortByTitle: function(list) {
        var sorted = list.sort(function(a, b) {
            var titleA = a.title.toUpperCase();
            var titleB = b.title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            }
            return 0;
        });
        return sorted;
    },

    getSorted: function(list, sortBy) {
        var sorted;
        switch (sortBy) {
            case "edit":
                sorted = this.sortByEdit(list);
                break;
            case "title":
                sorted = this.sortByTitle(list);
                break;
            case "date":
                sorted = this.sortByDate(list);
                break;
            case "dateDescending":
                sorted = this.sortByDateDescending(list);
                break;
            case "name":
                sorted = this.sortByName(list);
                break;
            case "eventDate":
                sorted = this.sortByEventDate(list);
                break;
        }
        return sorted;
    },

    filterBy: function(list, tags) {
        if (tags.length === 0) {
            return list;
        }
        var filtered = list.filter(function(item) {
            var keep = false;
            item.tags.forEach(function(tag) {
                if (tags.indexOf(tag) !== -1) {
                    keep = true;
                }
            })
            return keep;
        })
        return filtered;
    },

    sortAndFilter: function(list, tags, sortBy) {
        var filtered = this.filterBy(list, tags);
        return this.getSorted(filtered, sortBy);
    }
}
