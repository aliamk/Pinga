using System.Collections.Generic;           // ICollection
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<UserVisit> UserVisits { get; set; }
    }
}