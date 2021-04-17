using System;
using System.Collections.Specialized;
using System.Web;

namespace Microsoft.AspNetCore.Components
{
    // https://jasonwatmore.com/post/2020/08/09/blazor-webassembly-get-query-string-parameters-with-navigation-manager
    public static class NavigationManagerExtension
    {
        // get entire querystring name/value collection
        public static NameValueCollection QueryString(this NavigationManager navigationManager)
            => HttpUtility.ParseQueryString(new Uri(navigationManager.Uri).Query);

        // get single querystring value with specified key
        public static string QueryString(this NavigationManager navigationManager, string key)
            => navigationManager.QueryString()[key];
    }
}