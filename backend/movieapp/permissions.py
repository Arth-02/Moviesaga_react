from rest_framework import permissions

class IsNotSuperuserOrStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return not (request.user.is_superuser or request.user.is_staff)
        return False